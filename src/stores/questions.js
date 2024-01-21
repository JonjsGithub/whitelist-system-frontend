import { defineStore } from "pinia";
import { ref } from "vue";

export const useQuestionStore = defineStore(
    'questions',
    ()=>{
        const questions = ref('');
        const setQuestions = (newQuestions) => {
            questions.value = newQuestions
        }
        const clearQuestions = () => {
            questions.value = ''
        }
        return {
            questions, setQuestions, clearQuestions
        }
    },
    {
        persist: false,
    }
);
