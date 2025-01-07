// NodeTypes.js
import TextNode from './TextNode';
import ButtonNode from './ButtonNode';
import StartNode from './StartNode';
import ActionNode from './ActionNode';

const NodeTypes = {
    textNode: TextNode,
    buttonNode: ButtonNode,
    startNode: StartNode,
    actionNode: ActionNode,
};

export const initializeNodeData = (type) => {
    switch (type) {
        case 'textNode':
            return { text: '' }; // Dato inicial para un nodo de texto
        case 'buttonNode':
            return { label: '' }; // Dato inicial para un nodo botón
        case 'startNode':
            return {}; // Ejemplo de nodo inicial
        case 'actionNode':
            return { label: '' }; // Datos iniciales para un nodo de acción
        default:
            console.warn(`Tipo de nodo no reconocido: ${type}`);
            return {};
    }
};

export default NodeTypes;
