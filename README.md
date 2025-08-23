# BlueSchema

BlueSchema is a collection of JSON Schemas that describe an application in a structured way so AI tools can easily understand every component. The schemas capture entities, actions, groups, services, data sources, environment variables, access control, and basic views. Each action and service includes a `description` that explains what it does, acting as the prompt for AI-assisted tooling.

## Why BlueSchema?

Using a schema-driven approach for code generation offers several advantages over direct AI-based code generation:
- **Speed** – Generating code from a well-defined schema is significantly faster than relying on an AI to write everything from scratch.
- **Accuracy** – AI-generated code often varies based on the framework, leading to inconsistencies. A standardized schema ensures precise output.
- **Cost-Effective** – AI-powered coding requires more processing time and iterations, making it more expensive compared to structured generation.
- **Robustness** – Code generators built on BlueSchema enforce best practices and consistency across different programming languages and frameworks.

## Schemas

| Schema | Purpose |
| --- | --- |
| `application.json` | Entry point that ties together all components of an app, including actions and groups. |
| `core/entity.json` | Describes entities and their fields. |
| `core/action.json` | Models an action. The `description` acts as the action's prompt, and `useServices` lists dependent services. |
| `core/group.json` | Groups actions or other groups under a shared `routeSuffix`. |
| `core/parameter.json` | Defines parameters accepted by actions. |
| `core/dataSource.json` | Lists available data sources. |
| `core/environment.json` | Specifies required environment variables. |
| `core/access.json` | Rule describing who can access what. |
| `core/accessControl.json` | Application-wide roles and permissions. |
| `core/service.json` | Defines services available to the application. The `description` acts as the service's prompt. |
| `view/view.json` | View layout composed of rows, columns, and components. |

## How to Use

BlueSchema defines the structure of an application. To get started, create a JSON file that conforms to these schemas; tools can use it to build your application.

BlueSchema is still under development and not yet ready for production use. Stay tuned for updates as we refine the schemas.

🤝 **Want to contribute?** Feel free to collaborate, suggest improvements, or support the project!
