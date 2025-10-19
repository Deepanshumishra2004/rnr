import { useQueryStates } from 'nuqs';
import { WorkFlowParams } from '../params';


export const useWorkflowParams=()=>{
    return useQueryStates(WorkFlowParams)
}