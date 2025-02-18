# BlueSchema

🚀 **This project is seeking funding!** If you believe in the potential of AI-assisted development and standardized code
generation, consider supporting BlueSchema. Your contribution will help us create a universal schema that bridges AI and
software development.

---

## **Introduction**

BlueSchema aims to create a **JSON schema** capable of defining the **entire structure of an MVC application** with *
*advanced detail levels**, including **access control, data validation, and basic view representation**.

This project is designed to generate **boilerplates ready for development** in **any programming framework**, using code
generators. More importantly, by establishing a **unified standard**, we enable the creation of **JSON files that
represent applications via AI**, allowing instant code generation with a single click.

### **Why BlueSchema?**

Using a **schema-driven approach** for code generation offers several advantages over direct AI-based code generation:  
✅ **Speed** – Generating code from a well-defined schema is significantly faster than relying on an AI to write
everything from scratch.  
✅ **Accuracy** – AI-generated code often varies based on the framework, leading to inconsistencies. A standardized
schema ensures precise output.  
✅ **Cost-Effective** – AI-powered coding requires more processing time and iterations, making it more expensive compared
to structured generation.  
✅ **Robustness** – Code generators built on BlueSchema enforce best practices and consistency across different
programming languages and frameworks.

---

## **Schemas**

The following schemas define the core structure of BlueSchema:

| Schema Name               | Description                                                                                                     |
|---------------------------|-----------------------------------------------------------------------------------------------------------------|
| **`applicationSchema`**   | Defines the overall structure of an application, including models, controllers, and modules.                    |
| **`modelSchema`**         | Specifies the structure of data models, including columns, data types, constraints, and relationships.          |
| **`modelColumnSchema`**   | Defines properties of each column in a model, such as type, constraints (unique, required), and default values. |
| **`relationSchema`**      | Specifies relationships between models (hasOne, hasMany, belongsTo, manyToMany) along with foreign keys.        |
| **`controllerSchema`**    | Defines the structure of controllers, including their actions and associated models.                            |
| **`actionSchema`**        | Specifies each action within a controller, defining logic and associated views.                                 |
| **`viewSchema`**          | Describes the structure of views, including nested rows and columns with elements such as tables and lists.     |
| **`viewComponentSchema`** | Defines the basic building blocks of a view, such as headings, paragraphs, tables, and cards.                   |
| **`viewColumnSchema`**    | Defines columns within views, allowing width adjustments and nested components.                                 |
| **`moduleSchema`**        | Defines application modules, specifying controllers and dependencies.                                           |

---

## **Proposed Code Generators**

Below is a list of **planned** code generators for different programming languages and frameworks. The **Package**
column will be updated with repository links as generators are developed.

### **PHP**

| Framework   | Package |
|-------------|---------|
| Laravel     | --      |
| Symfony     | --      |
| CodeIgniter | --      |
| Yii2        | --      |

### **Python**

| Framework | Package |
|-----------|---------|
| Django    | --      |
| Flask     | --      |
| FastAPI   | --      |

### **Node.js**

| Framework  | Package |
|------------|---------|
| Express.js | --      |
| NestJS     | --      |
| Koa        | --      |

### **Java**

| Framework   | Package |
|-------------|---------|
| Spring Boot | --      |
| Quarkus     | --      |
| Micronaut   | --      |

---

BlueSchema is still under development and **not yet ready for production use**. Stay tuned for updates as we expand
support for various frameworks and integrate AI-assisted application generation.

🤝 **Want to contribute?** Feel free to collaborate, suggest improvements, or support the project!


[best-practices.md](docs/best-practices.md)
[faq.md](docs/faq.md)
[how-to-use.md](docs/how-to-use.md)
[integration-guide.md](docs/integration-guide.md)
[roadmap.md](docs/roadmap.md)
[schema-definition.md](docs/schema-definition.md)

