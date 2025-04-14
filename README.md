# React Basic Practice

## Overview

Welcome to my Student Management Dashboard - a React and TypeScript-based administrative interface for efficient student data management. This project demonstrates the implementation of CRUD (Create, Read, Update, Delete) operations within a responsive dashboard environment.
<b>Key Features:<b>

- Complete student lifecycle management
- Advanced sorting and search capabilities
- Intuitive user interface for administrative tasks

This project showcases practical applications of React with TypeScript while delivering essential functionalities for educational administration. All necessary resources and documentation links are provided below.

## Timeline

- Estimation: 19/03/2025 - 25/03/2025 ( 5 days ).

## Team size

- 1 Dev ([Luan Vu](luan.vu@asnet.com.vn))

## Technical terms

- HTML5

- CSS3

- TYPESCRIPT

- JSON SERVER

- REACT HOOK

## Target

- Be able to initialize a React application by single command line

- Get familiar with JSX syntax and be able to implement React components based on real UI design

- Know how a React application works and accomplish a single React page

- Set up and get to know with Storybook which will assist to manage components system in the development environment

## Prerequisite

- Visual Studio Code version [1.97.2]

- Node.js [v20.18.1]

- ESlint version[9.22.0]

- Prettier version [3.5.3]

- TypeScript version [5.7.2]

- Json server version [0.17.4]

- React [19.0.0]

- Vite [6.2.0]

- Storybook [8.6.7]

- Extensions: editorconfig, Prettier, ESlint

## Tested environments

- Chrome version [134.0.6998.179], version [135.0.7049.42]

- Firefox version [135.0.1], version [136.0.4]

- Safari version [17.5], version [18.3]

## Folder's structure

```
|- server/
    |- db.json
|- src/
    |- assets/
        |- fonts/
        |- images/
        |- icons/
    |- styles/

    |- constants/
    |- contexts/
    |- component/
        |- common/
    |- pages/
        |- LoginPage/
        |- PageNotFound/
        |- StudentPage/

    |- services/
        |- BaseService
        |- StudentService
        |- UserService
        |- ImageUpload
    |- route/
    |- types/
    |- models/
    |- utils/
    |- App.tsx
    |- main.tsx
    |- vite-env.d.ts
|- .editorconfig
|- .eslintignore
|- .eslintrc.json
|- .gitignore
|- .prettierrc
|- index.html
|- pnpm-lock.yaml
|- package-lock.json
|- package.json
|- README.md
|- tsconfig.json
|- tsconfig.app.json
|- tsconfig.node.json
|- vite.config.ts
|- vite.workspace.ts
```

## Step by step to run this app in your local

| Command                                                              | Action                           |
| -------------------------------------------------------------------- | -------------------------------- |
| git clone https://gitlab.asoft-python.com/luan.vu/react-training.git | Download the source code         |
| cd react-basic-practice                                              | Move to folder                   |
| git checkout feat/practice                                           | Checkout to branch feat/practice |
| pnpm install                                                         | Install dependencies             |
| pnpm run dev                                                         | Run the application              |
| Open new terminal for story book                                     |                                  |
| pnpm storybook                                                       | Run storybook                    |
| Open new terminal to run JSON server locally                         |                                  |
| pnpm run json-server                                                 | Run Json server locally          |

<b>Notes:<b>

- See the deployment link on Vercel at the end of this document for more details

## Contributing

I welcome any and all contribution! If you have found or encountered any bugs or issues, please let me know. Any recommendation is also welcomed.

## Helpful links

[Figma](<https://www.figma.com/design/y1neVAZqOKLlio8rkUPYTg/Crud-Operations-(Community)?node-id=1-9&t=Kl0hyx0c4JsrWUsZ-0>)

[My training plan](https://docs.google.com/document/d/1Ik4AYABHuI4tjoWYdedQHfjSoxpWGgjkKYRzaobE8Og/edit?tab=t.0#heading=h.ar0k1bmftkqn)

[Practice plan](https://docs.google.com/document/d/1NtiwHfMuaavMyQpGGj_O2nzuubNSdHKw/edit)

[Deployment link](https://react-basic-training-luanvu.vercel.app/login)

###

Special thanks to my mentor Mr. Minh Tran, my supporter Mr. Thinh Nguyen and Mr. Tuan Thai who provide me all the useful help and support throughout my training session. It is my pleasure to work with you guys!
