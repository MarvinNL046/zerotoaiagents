"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { QuizQuestion } from "./quiz-question";
import { QuizResults } from "./quiz-results";
import { Progress } from "@/components/ui/progress";
import type { AiAgentProvider } from "@/lib/ai-agent-data";
import { useTranslations } from "next-intl";

export type QuizAnswers = {
  useCase?: string;
  budget?: string;
  technicalLevel?: string;
  freeTier?: string;
  teamSize?: string;
};

type QuizWizardProps = {
  agents: AiAgentProvider[];
  locale: string;
};

export function QuizWizard({ agents, locale }: QuizWizardProps) {
  const t = useTranslations("quiz");
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [showResults, setShowResults] = useState(false);

  const totalSteps = 5;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
      setCurrentStep(totalSteps - 1);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    return (
      <QuizResults
        answers={answers}
        agents={agents}
        onBack={handleBack}
        onReset={handleReset}
        locale={locale}
      />
    );
  }

  const questions = [
    {
      id: "useCase",
      title: "What do you primarily need an AI agent for?",
      options: [
        { value: "coding", label: "Writing code" },
        { value: "automation", label: "Automating workflows" },
        { value: "support", label: "Customer support" },
        { value: "research", label: "Research & analysis" },
        { value: "content", label: "Content creation" },
        { value: "general", label: "General tasks" },
      ],
    },
    {
      id: "budget",
      title: "What's your monthly budget?",
      options: [
        { value: "free", label: "Free only" },
        { value: "low", label: "Under $20/month" },
        { value: "medium", label: "$20-50/month" },
        { value: "high", label: "$50-200/month" },
        { value: "unlimited", label: "No budget limit" },
      ],
    },
    {
      id: "technicalLevel",
      title: "What's your technical skill level?",
      options: [
        { value: "non-technical", label: "Non-technical" },
        { value: "some", label: "Some technical knowledge" },
        { value: "developer", label: "Developer" },
        { value: "advanced", label: "Advanced/Enterprise" },
      ],
    },
    {
      id: "freeTier",
      title: "How important is a free tier?",
      options: [
        { value: "essential", label: "Essential (must have)" },
        { value: "nice", label: "Nice to have" },
        { value: "not-important", label: "Not important" },
      ],
    },
    {
      id: "teamSize",
      title: "What size is your team?",
      options: [
        { value: "solo", label: "Just me" },
        { value: "small", label: "2-10 people" },
        { value: "medium", label: "11-50 people" },
        { value: "large", label: "50+ people" },
      ],
    },
  ];

  const currentQuestion = questions[currentStep];
  const currentAnswer = answers[currentQuestion.id as keyof QuizAnswers];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="p-6 md:p-8">
        <QuizQuestion
          question={currentQuestion}
          selectedValue={currentAnswer}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onBack={handleBack}
          isFirstQuestion={currentStep === 0}
          isLastQuestion={currentStep === totalSteps - 1}
        />
      </Card>

      {/* Help Text */}
      <p className="text-center text-sm text-muted-foreground">
        Answer these questions to get personalized AI agent recommendations
      </p>
    </div>
  );
}
