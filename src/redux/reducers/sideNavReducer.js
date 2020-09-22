import * as actionTypes from '../actionTypes/appActionTypes';
import urls from 'urls'

// For convenience while developing, set this true
// false will make the menus collapse
const enableAll = true

// Define a total ordering on the steps.
const stepOrderDefinition = [
	'recordings',
	'engine',
	'pronunciation',
	'train',
	'transcribe'
];

export function stepToOrder(stepName) {
	return stepOrderDefinition.findIndex(v => v===stepName);
}

// Get the name of the next step according to the stepOrderDefinition variable.
function getNextStepName(stepName, engine) {
	if (stepName === null) return null;

	let stepIndex = stepToOrder(stepName);

	// if current step is not in the list
	if (stepIndex === -1) {
		throw "stepName: " + stepName + " is not in the stepOrderDefinition list.";
	}

	// if there is no next step
	if (stepIndex === stepOrderDefinition.length - 1) {
		return null;
	}

	let nextStepName = stepOrderDefinition[stepIndex + 1];

	// if non-kaldi engine, then skip 'pronunciation'
	if (engine !== "kaldi" && nextStepName === 'pronunciation') {
		nextStepName = getNextStepName(nextStepName);
	}

	return nextStepName;
}

const initialStepModelState = {
	engine: null,
	engine_list: [],
	lastURL: null,
	steps: {
		recordings: {
			substeps: [
				{ done: false, doing: false, enabled: false, title: "Recordings", path: urls.gui.dataset.index },
				{ done: false, doing: false, enabled: false, title: "Files", path: urls.gui.dataset.files },
				{ done: false, doing: false, enabled: false, title: "Visualise", path: urls.gui.dataset.visualise },
				{ done: false, doing: false, enabled: false, title: "Wordlist", path: urls.gui.dataset.prepare }
			],
			engine_specific: null
		},
		engine: {
			substeps: [
				{ done: false, doing: false, enabled: false, title: "Engine", path: urls.gui.engine.index }
			],
			engine_specific: null
		},
		// Note: Pronunciation step will only be visible when state.engine == "kaldi".
		// TODO: Prehaps store engine specific details in the engine step
		pronunciation: {
			substeps: [
				{ done: false, doing: false, enabled: false, title: "Pronunciation", path: urls.gui.pronDict.index },
				{ done: false, doing: false, enabled: false, title: "Letter to sound", path: urls.gui.pronDict.l2s },
				{ done: false, doing: false, enabled: false, title: "Dictionary", path: urls.gui.pronDict.lexicon }
			],
			engine_specific: 'kaldi'
		},
		train: {
			substeps: [
				{ done: false, doing: false, enabled: false, title: "Training", path: urls.gui.model.index },
				{ done: false, doing: false, enabled: false, title: "Settings", path: urls.gui.model.settings },
				{ done: false, doing: false, enabled: false, title: "Train", path: urls.gui.model.train },
				{ done: false, doing: false, enabled: false, title: "Results", path: urls.gui.model.results },
			],
			engine_specific: null
		},
		transcribe: {
			substeps: [
				{ done: false, doing: false, enabled: false, title: "New transcriptions", path: urls.gui.transcription.new }
			],
			engine_specific: null
		}
	}
}

const sideNav = (state = initialStepModelState, action) => {
	switch (action.type) {
		case actionTypes.ENGINE_LOAD_STARTED:
		case actionTypes.ENGINE_LOAD_FAILURE:
		case actionTypes.ENGINE_LIST_STARTED:
		case actionTypes.ENGINE_LIST_FAILURE:
			return {...state}

		case actionTypes.ENGINE_LIST_SUCCESS:
			let engine_list = action.response.data.data.engine_list;
			return { ...state, engine_list };

		case actionTypes.ENGINE_LOAD_SUCCESS:
			state = { ...state, engine: action.response.data.data.engine };
			// Fall through to setting the current step
			action['url'] = state.lastURL;
			// No return here!

		// eslint-disable-next-line no-fallthrough
		case actionTypes.APP_SET_CURRENT_STEP: {
			let currentSubStepIndex = 0;
			let currentStepName = null;
			// Make a copy of the original steps as to not override the initial steps.
			let originalStepsState = Object.assign({}, initialStepModelState);

			// Used to enable next groups of steps if user is on last substep
			let rememberToEnableTheNextStep = false;

			// Track down which is the current substep by matching path to URL
			// Split the url into parts, remove the first / to avoid empty first item in array

			// Iterate through main steps
			for (let [stepName, step] of Object.entries(originalStepsState.steps)) {
				step.substeps.forEach((substep, i) => {
					if (action.url === substep.path) {
						// Found the current step!
						currentStepName = stepName;
						currentSubStepIndex = i;
					}
				});
			}

			let rebuiltSteps = {};
			Object.entries(originalStepsState.steps).forEach(([stepName, step], i) => {
				// Determine this steps situation.
				let isPastStep =    stepToOrder(stepName)  <  stepToOrder(currentStepName);
				let isCurrentStep = stepToOrder(stepName) === stepToOrder(currentStepName);
				let isFutureStep =  stepToOrder(stepName)  >  stepToOrder(currentStepName);

				// Determine whether step is to be kept based on selected engine.
				if (step.engine_specific !== null && step.engine_specific !== state.engine) {
					// The engine has been specified and this step does not belong to this engine.
					return; // Skip construction step.
				}

				step.substeps.forEach((substep, i) => {
					// reset all
					substep.done = false
					substep.doing = false
					substep.enabled = false

					// Determine the substep situation
					let isPastSubStep =    i  <  currentSubStepIndex;
					let isCurrentSubStep = i === currentSubStepIndex;
					let isNextSubStep =    i === currentSubStepIndex + 1;
					let isLastSubStep =    i === currentSubStepIndex - 1;

					// previous
					if (isPastStep || (isCurrentStep && isPastSubStep)) {
						step.done = true
						substep.done = true
						step.enabled = true
						substep.enabled = true
					}
					// this one
					if (isCurrentStep) {
						step.doing = true
						step.enabled = true
					}
					// this one
					if (isCurrentStep && isCurrentSubStep) {
						substep.doing = true
						substep.enabled = true
					}
					// next one
					if (isCurrentStep && isNextSubStep) {
						substep.enabled = true
					}
					// also enable first substeps in next step if we are on the last substep in a step
					if (isCurrentStep && isCurrentSubStep && isLastSubStep) {
						rememberToEnableTheNextStep = true
					}
					// future steps
					if (isFutureStep) {
						step.enabled = false
					}

					// For developer convenience...
					if (enableAll) substep.enabled = true
				});

				// add step to the rebuilt steps
				rebuiltSteps[stepName] = step;
			});


			let nextStepName = getNextStepName(currentStepName, state.engine)
			// ->                           && if there is a next step
			if (rememberToEnableTheNextStep && nextStepName ) {
				rebuiltSteps[nextStepName].substeps[0].enabled = true
			}

			return { ...state, steps: rebuiltSteps, lastURL: action.url }
		}
		default:
			return { ...state }
	}
}
export default sideNav;