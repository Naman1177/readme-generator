const projectTitle = document.getElementById('project-title');
        const description = document.getElementById('description');
        const techStack = document.getElementById('tech-stack');
        const installation = document.getElementById('installation');
        const usage = document.getElementById('usage');
        const outputPreview = document.getElementById('output-preview');
        const livePreview = document.getElementById('live-preview');
        const copyBtn = document.getElementById('copy-btn');

        // Attach keyup event listeners to all inputs
        const formElements = [projectTitle, description, techStack, installation, usage];
        formElements.forEach(element => {
            element.addEventListener('keyup', generateMarkdown);
        });

        // Generate markdown function
        function generateMarkdown() {
            const titleValue = projectTitle.value.trim();
            const descValue = description.value.trim();
            const techStackValue = techStack.value.trim();
            const installValue = installation.value.trim();
            const usageValue = usage.value.trim();

            // If all fields are empty, show placeholder
            if (!titleValue && !descValue && !techStackValue && !installValue && !usageValue) {
                outputPreview.className = 'placeholder-text';
                outputPreview.innerText = 'Your README.md will appear here as you type...';
                livePreview.className = 'placeholder-text';
                livePreview.innerHTML = 'Rendered markdown preview will appear here...';
                return;
            }

            // Remove placeholder styling
            outputPreview.className = '';
            livePreview.className = '';

            // Format tech stack as bullet points
            let techStackFormatted = '';
            if (techStackValue) {
                const techLines = techStackValue.split('\n').filter(line => line.trim());
                techStackFormatted = techLines.map(line => `- ${line.trim()}`).join('\n');
            }

            // Build the markdown string
            let markdown = '';

            if (titleValue) {
                markdown += `# ${titleValue}\n\n`;
            }

            if (descValue) {
                markdown += `${descValue}\n\n`;
            }

            if (techStackFormatted) {
                markdown += `## Tech Stack\n\n${techStackFormatted}\n\n`;
            }

            if (installValue) {
                markdown += `## Installation\n\n\`\`\`bash\n${installValue}\n\`\`\`\n\n`;
            }

            if (usageValue) {
                markdown += `## Usage\n\n\`\`\`\n${usageValue}\n\`\`\`\n\n`;
            }

            // Add standard sections
            if (titleValue || descValue) {
                markdown += `## Contributing\n\nPull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.\n\n`;
                markdown += `## License\n\n[MIT](https://choosealicense.com/licenses/mit/)`;
            }

            // Update the raw markdown preview
            outputPreview.innerText = markdown || 'Start typing to generate your README...';

            // Update the live preview with rendered markdown
            if (markdown) {
                livePreview.innerHTML = marked.parse(markdown);
            } else {
                livePreview.innerHTML = 'Start typing to generate your README...';
            }
        }

        // Copy to clipboard functionality
        copyBtn.addEventListener('click', async () => {
            const markdownText = outputPreview.innerText;

            // Don't copy placeholder text
            if (outputPreview.className === 'placeholder-text') {
                return;
            }

            try {
                await navigator.clipboard.writeText(markdownText);
                
                // Change button text and style
                const originalText = copyBtn.innerText;
                copyBtn.innerText = 'Copied!';
                copyBtn.classList.add('copied');

                // Reset button after 2 seconds
                setTimeout(() => {
                    copyBtn.innerText = originalText;
                    copyBtn.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
                copyBtn.innerText = ' Failed to copy';
                setTimeout(() => {
                    copyBtn.innerText = 'Copy to Clipboard';
                }, 2000);
            }
        });

        // Initial generation (in case of browser autofill)
        generateMarkdown();
