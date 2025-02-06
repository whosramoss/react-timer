import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useFormContext } from "react-hook-form";
import { useContext } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function NewCycleForm() {
   const { activeCycle } = useContext(CyclesContext)
   const { register } = useFormContext()

   return (
      <FormContainer>
         <label htmlFor="task">I will work on</label>
         <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="task name"
            disabled={!!activeCycle}
            {...register("task")}
         />

         <datalist id="task-suggestions">
            <option value="Organize Digital Space" />
            <option value="Learn a New Skill" />
            <option value="Quick Physical Activity" />
         </datalist>

         <label htmlFor="">for</label>
         <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            disabled={!!activeCycle}
            {...register("minutesAmount", { valueAsNumber: true })}
         />

         <span>minutes.</span>
      </FormContainer>
   )
}