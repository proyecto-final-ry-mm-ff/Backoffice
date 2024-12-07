import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Select, MenuItem, Box, Typography } from '@mui/material';

const ActionNode = ({ data }) => {
    const [selectedAction, setSelectedAction] = useState('');

    const handleActionChange = (event) => {
        setSelectedAction(event.target.value);
        console.log('Acción seleccionada:', event.target.value); // Puedes usar esto para enviar datos al flujo
    };

    return (
        <div
            style={{
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                background: '#555555',
                color: '#fff',
                textAlign: 'center',
            }}
        >
            {/* Puerto de entrada */}
            <Handle type="target" position={Position.Left} id="target" />

            {/* Contenido del nodo */}
            <Box>
                <Typography variant="subtitle1" gutterBottom>
                    Acción
                </Typography>
                <select
                    value={selectedAction}
                    onChange={handleActionChange}
                    displayEmpty
                    style={{
                        background: '#fff',
                        color: '#000',
                        marginTop: '10px',
                        borderRadius: '5px',
                        width: '100%',
                    }}
                >
                    <option value="" disabled>
                        Selecciona una acción
                    </option>
                    <option value="Llamar Operador">Llamar Operador</option>
                    <option value="Generar Ticket">Generar Ticket</option>
                    <option value="Registrar Mail">Registrar Mail</option>
                </select>
            </Box>

        </div>
    );
};

export default ActionNode;
