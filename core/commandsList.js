export const commands  = {
    "-m" : {
        description: "Minifica un archivo Js y lo inserta en la misma ruta",
        subcommands: false,
    },
    "-ms" : {
        description: "Minifica un archivo css y lo inserta en la ruta indicada por defecto es la ruta del archivo origen",
        subcommands: false,
    },
    "-l" : {
        description: "Lista todos los paquetes o utilidades disponibles",
        subcommands: ['tools', 'plugins', 'templates'],
    },
    "-list" : {
        description: "Lista todos los paquetes o utilidades disponibles",
        subcommands: ['tools', 'plugins', 'templates'],
    },
    "-h" : {
        description: "Lista todos los comandos disponibles a ejecutar de primera linea",
        subcommands: false,
    },
    "-help" : {
        description: "Lista todos los comandos disponibles a ejecutar de primera linea",
        subcommands: false,
    },
    "create" : {
        description: "Extrae utilidades o paquetes",
        subcommands: ['tool', 'plugin', 'template'],
    },
}