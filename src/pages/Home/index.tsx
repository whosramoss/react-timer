import { HandPalm, Play } from "phosphor-react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { CyclesContext } from "../../contexts/CyclesContext";
import * as zod from "zod"

import {
   HomeContainer,
   StartCountdownButton,
   StopCountdownButton,
} from "./styles";

const newCycleFormValidationSchema = zod.object({
   task: zod.string().min(1, "Report the task"),
   minutesAmount: zod
      .number()
      .min(5, "The cycle must be at least 5 minutes long.")
      .max(60, "The cycle must be a maximum of 60 minutes"),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
   const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

   const newCycleForm = useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
         task: "",
         minutesAmount: 0,
      }
   })

   const { handleSubmit, watch, reset } = newCycleForm

   function handleCreateNewCycle(data: NewCycleFormData) {
      createNewCycle(data)
      reset()
   }

   const task = watch("task")
   const isSubmitDisabled = !task

   return (
      <HomeContainer>
         <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

            <FormProvider {...newCycleForm}>
               <NewCycleForm />
            </FormProvider>
            <Countdown />

            {activeCycle ? (
               <StopCountdownButton onClick={interruptCurrentCycle} type="button">
                  <HandPalm size={24} />
                  Interrupt
               </StopCountdownButton>
            ) : (
               <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                  <Play size={24} />
                  Start
               </StartCountdownButton>
            )}
         </form>
      </HomeContainer>
   )
}