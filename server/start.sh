#!/bin/bash
echo "Iniciando Fake API de Pawtient..."
npx json-server --watch db.json --routes routes.json --port 3001