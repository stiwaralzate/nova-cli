import inquirer from "inquirer";
import {exec}  from 'node:child_process'

const init = ()=>{

  inquirer
    .prompt([
      {
          name: "projectName",
          message: "Nombre del proyecto",
          default: "nova-project"
      },
      {
          type: "list",
          name: "projectType",
          message: "¿Qué proyecto deseas instalar?",
          choices: ['bricks', 'elementor', 'wordpress'],
      },
      {
          type: "list",
          name: "projectTemplate",
          message: "¿Qué plantilla deseas instalar?",
          choices: ['default', 'dark', 'light'],
      }
    ])
    .then((answers) => {
      if(answers?.projectType){
          console.log('inicializando el proyecto '+answers?.projectType)
          exec('git init', (error, stdout, stderr) => {
              if (error) {
                  console.error(`Error al ejecutar el comando: ${error.message}`);
                  return;
              }
              if (stderr) {
                  console.error(`Error en la salida estándar: ${stderr}`);
                  return;
              }
              console.log(`Comando ejecutado correctamente: ${stdout}`);
          });

      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
      console.log(error)

    });

}

export default init