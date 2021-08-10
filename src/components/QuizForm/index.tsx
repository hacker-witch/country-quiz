interface QuizFormProps {
  question: string;
}

export const QuizForm = ({ question }: QuizFormProps) => (
  <form>
    <fieldset>
      <legend>{question}</legend>
    </fieldset>
  </form>
)