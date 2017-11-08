# Development strategy

We recommend a Data Driven development approach, where you start by outlining your data via mocks. Develop your generator in reverse from end to beginning, so you start with the goal in mind.

Start by writing your templates and what data you want for each template file. Then write template data mocks in `_mock/write/template-data`

Now test your Generator running only the `writing` step with this template data and repeat with different data configurations. When you are happy, go back one step.

Enjoy :)
