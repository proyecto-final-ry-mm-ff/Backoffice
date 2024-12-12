// NodeTypes.js
import TextNode from './TextNode';
import ButtonNode from './ButtonNode';
import StartNode from './StartNode';
import ActionNode from './ActionNode';
import AwaitNode from './AwaitNode';

const NodeTypes = {
    textNode: TextNode,
    buttonNode: ButtonNode,
    startNode: StartNode,
    actionNode: ActionNode,
    awaitNode: AwaitNode,
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
        case 'awaitNode':
            return {}; // Dato inicial para un nodo de espera
        default:
            console.warn(`Tipo de nodo no reconocido: ${type}`);
            return {};
    }
};

export default NodeTypes;
