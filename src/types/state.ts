import { UseValidationState } from '@prefecthq/vue-compositions'

export type State = Pick<UseValidationState, 'pending' | 'valid' | 'validated'>