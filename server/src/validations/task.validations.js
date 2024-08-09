import { body } from "express-validator";

export const validateAddTask = [
    body("title")
    .isString().withMessage("El titulo debe ser un string")
    .isEmpty().withMessage("El titulo no debe ser vacío")
    .isLength({max:255}).withMessage("El título debe tener un máximo de 255"),
    body("description")
    .isString().withMessage("La descripción debe ser un string")
    .isEmpty().withMessage("La descripción no puede estar vacia"),
    body("isComplete")
    .isBoolean().withMessage("isComplete debe ser booleano")
    .isEmpty().withMessage("isComplete no puede estar vació")
]
export const validateUpdateTask = [
    body("title")
    .optional()
    .isString().withMessage("El titulo debe ser un string")
    .isLength({max:255}).withMessage("El título debe tener un máximo de 255"),
    body("description")
    .optional()
    .isString().withMessage("La descripción debe ser un string"),
    body("isComplete")
    .optional()
    .isBoolean().withMessage("isComplete debe ser booleano"),
]
