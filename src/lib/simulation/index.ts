/**
 * Simulation System - Main Export
 */

export * from './simulation-engine';
export * from './simulation-content';
export * from './assessment-integration';

// Re-export commonly used items
export { simulationEngine } from './simulation-engine';
export { SIMULATIONS, getSimulationsByPhase, getSimulationsByType, getSimulationById } from './simulation-content';
export { assessmentEngine } from './assessment-integration';
