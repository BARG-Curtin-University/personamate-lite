// prompts.js - ES6+ LLM prompt generation utilities

import { collectFormData } from './rag.js';
import { showModal } from '../modals.js';

/**
 * Generates a detailed LLM prompt from a personality profile
 * @param {Object} data - The personality data
 * @returns {string} A formatted LLM prompt
 */
export function generateDetailedPrompt(data) {
  const firstName = data.characterName ? data.characterName.split(' ')[0] : "the representative";
  const fullName = data.characterName || "the organizational representative";
  const orgName = data.orgName || "the organization";
  const role = data.characterRole || "representative";
  const orgType = data.orgType || "organization";
  const audience = data.audience || "users";
  const communicationStyle = data.communicationStyle || "Professional";
  const theories = data.obTheories || "modern organizational behavior principles";
  const decisionMaking = data.decisionMaking || "rational decision-making";
  const emotionalIntelligence = data.emotionalIntelligence || "emotional intelligence";
  const feedbackMechanism = data.feedbackMechanism || "constructive feedback";
  const values = data.coreValues || "integrity, excellence";
  const gender = data.characterGender || "neutral";
  
  let pronouns = {
    subject: "they",
    object: "them",
    possessive: "their",
    reflexive: "themselves"
  };
  
  if (gender === "masculine") {
    pronouns = {
      subject: "he",
      object: "him",
      possessive: "his",
      reflexive: "himself"
    };
  } else if (gender === "feminine") {
    pronouns = {
      subject: "she",
      object: "her",
      possessive: "her",
      reflexive: "herself"
    };
  }

  const prompt = `I want you to act as ${fullName}, a ${role} at ${orgName}, which is a ${orgType}. Your primary audience is ${audience}. You should use a ${communicationStyle} communication style.

Your personality should be informed by the following organizational behavior theories: ${theories}.

When making decisions, you prefer a ${decisionMaking} approach. You demonstrate ${emotionalIntelligence} in your interactions and provide ${feedbackMechanism}.

The core values that guide your work are: ${values}.

Please respond to all queries as if you are ${firstName}, using "${pronouns.subject}/${pronouns.object}/${pronouns.possessive}" pronouns. You should draw on your experience as a ${role} at ${orgName} and apply organizational behavior principles in your responses.

This is for an educational role-playing exercise designed to teach organizational behavior concepts in a practical way.`;

  return prompt;
}

/**
 * Generates and displays a modal with LLM prompt based on the current personality
 */
export function generateLLMPrompt() {
  try {
    console.log("🤖 Generating LLM prompt");
    const formData = collectFormData();
    const prompt = generateDetailedPrompt(formData);
    
    // Check if showModal is available (should be imported)
    if (typeof showModal === 'function') {
      showModal({
        title: 'LLM Prompt for Role-Play Simulation',
        content: prompt,
        instructions: `
          <p>The following prompt is specifically designed for Large Language Models (LLMs) like Claude, GPT, etc.
          It will instruct the LLM to act as a character for educational role-play scenarios based on your selected personality profile.</p>
          <p>You can copy this prompt and paste it at the beginning of your conversation with any capable LLM to create
          a customised educational experience for organisational behavior training.</p>
        `,
        copyButtonText: 'Copy Prompt',
        contentClass: 'prompt-content'
      });
    } else {
      // Fallback if modal system isn't available
      console.warn("Modal system not available, using basic alert");
      alert("LLM Prompt Generated:\n\n" + prompt + "\n\n(Copy this text to use with your preferred LLM)");
    }
    
    console.log("✅ LLM prompt generated successfully");
  } catch (error) {
    console.error("❌ Error generating LLM prompt:", error);
    alert("There was a problem generating the LLM prompt. Please try again.");
  }
}

// Make functions globally available for standalone version
if (typeof window !== 'undefined') {
  window.generateLLMPrompt = generateLLMPrompt;
  window.generateDetailedPrompt = generateDetailedPrompt;
}
