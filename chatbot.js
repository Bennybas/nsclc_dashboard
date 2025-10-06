class NSCLCBot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.initializeBot();
        this.addEventListeners();
        this.addWelcomeMessage();
    }

    initializeBot() {
        this.toggleButton = document.getElementById('chatbot-toggle');
        this.modal = document.getElementById('chatbot-modal');
        this.messagesContainer = document.getElementById('chatbot-messages');
        this.input = document.getElementById('chatbot-input');
        this.sendButton = document.getElementById('chatbot-send');
        this.closeButton = document.getElementById('chatbot-close');
    }

    addEventListeners() {
        this.toggleButton.addEventListener('click', () => this.toggleChat());
        this.closeButton.addEventListener('click', () => this.closeChat());
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Close on outside click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeChat();
            }
        });
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        this.modal.classList.remove('hidden');
        this.isOpen = true;
        this.input.focus();
    }

    closeChat() {
        this.modal.classList.add('hidden');
        this.isOpen = false;
    }

    addWelcomeMessage() {
        const welcomeMessage = {
            type: 'bot',
            text: "Hello! I'm your NSCLC Healthcare Intelligence Assistant. I can help you understand the data, answer questions about patient analysis, diagnosis trends, and more. How can I assist you today?"
        };
        this.addMessage(welcomeMessage);
    }

    addMessage(message) {
        this.messages.push(message);
        this.renderMessage(message);
        this.scrollToBottom();
    }

    renderMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.type}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = message.text;
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = this.getCurrentTime();
        
        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(messageTime);
        
        this.messagesContainer.appendChild(messageDiv);
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }

    sendMessage() {
        const userInput = this.input.value.trim();
        if (!userInput) return;

        // Add user message
        this.addMessage({
            type: 'user',
            text: userInput
        });

        this.input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate bot response delay
        setTimeout(() => {
            this.hideTypingIndicator();
            const botResponse = this.generateResponse(userInput);
            this.addMessage({
                type: 'bot',
                text: botResponse
            });
        }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        const dots = document.createElement('div');
        dots.className = 'typing-dots';
        dots.innerHTML = '<span></span><span></span><span></span>';
        
        typingDiv.appendChild(dots);
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    generateResponse(userInput) {
        const input = userInput.toLowerCase();
        
        // Data analysis responses
        if (input.includes('patient') && input.includes('count')) {
            return "Based on the current data analysis, we have identified significant patient populations across multiple data sources. The patient analysis section shows detailed demographics and geographic distribution patterns.";
        }
        
        if (input.includes('diagnosis') || input.includes('diagnoses')) {
            return "The diagnosis analysis reveals key patterns in NSCLC patient identification. You can find detailed breakdowns of diagnosis codes, prescription patterns, and treatment trends in the Diagnosis and Prescription Analysis section.";
        }
        
        if (input.includes('procedure') || input.includes('hcp') || input.includes('hco')) {
            return "HCP/HCO analysis provides insights into healthcare provider patterns, procedure codes, and organizational structures. This data helps understand the treatment landscape and provider networks.";
        }
        
        if (input.includes('data quality') || input.includes('reliability')) {
            return "Our data quality metrics show high reliability across all sources. The platform uses advanced validation techniques to ensure data accuracy and completeness for informed decision-making.";
        }
        
        if (input.includes('sankey') || input.includes('flow')) {
            return "The Sankey diagrams visualize data flow between different stages (provided, visible, missing). These charts help identify data gaps and understand the completeness of information across sources.";
        }
        
        if (input.includes('source') && (input.includes('iqvia') || input.includes('healthverity') || input.includes('komodo'))) {
            return "We integrate data from multiple sources including IQVIA, HealthVerity, and Komodo. Each source provides unique insights, and our platform combines them for comprehensive analysis.";
        }
        
        if (input.includes('trend') || input.includes('trends')) {
            return "Temporal trend analysis shows patterns over time, helping identify seasonal variations, treatment evolution, and market dynamics in NSCLC care.";
        }
        
        if (input.includes('market') || input.includes('access')) {
            return "Market basket analysis reveals co-occurring diagnoses, procedures, and treatments, providing insights into patient care patterns and treatment combinations.";
        }
        
        if (input.includes('help') || input.includes('what can you do')) {
            return "I can help you understand:\n• Patient demographics and analysis\n• Diagnosis and prescription patterns\n• HCP/HCO provider analysis\n• Data quality metrics\n• Sankey flow visualizations\n• Market trends and insights\n\nJust ask me about any aspect of the NSCLC data!";
        }
        
        if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
            return "Hello! Welcome to the NSCLC Healthcare Intelligence platform. I'm here to help you navigate and understand the comprehensive analytics available. What would you like to explore?";
        }
        
        // Default responses
        const defaultResponses = [
            "That's an interesting question about NSCLC data. You might find relevant information in one of the analysis sections. Could you be more specific about what you're looking for?",
            "I understand you're interested in learning more. The dashboard contains comprehensive NSCLC analytics across multiple dimensions. Which specific area would you like to explore?",
            "Great question! The platform provides detailed insights across patient analysis, diagnosis patterns, and provider networks. What specific aspect would you like to know more about?",
            "I can help you navigate the NSCLC intelligence platform. Try asking about patient demographics, diagnosis trends, or data quality metrics for more specific information."
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
}

// Initialize the chatbot when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NSCLCBot();
});
