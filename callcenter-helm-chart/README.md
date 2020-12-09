--
# Title: Linhaverde Backend Helm Charts 
--

This is Linhaverde official helm charts for installing and getting instance up and running with Kubernetes.

## First time set-up
2. Initialize helm in cluster:
```helm init```

3. Install OR Update pagalu from this repository:
``` helm upgrade --install --force linhaverde-chart . ```
OR
``helm upgrade linhaverde-chart .``

# Configurations:
To specify a custom values file, for instance for the purpose of different values per environment: dev and production:
    `helm upgrade --install linhaverde-chart . -f values-sandbox.yaml`

## Debuging commands
   To launch proxy of internal IP (if installing a second verion with different name, match release accordingly):
   - export LINHAVERDE_POD=$(kubectl get pods --namespace {{ .Release.Namespace }} -l "app.kubernetes.io/name={{ include "linhaverde-chart.name" . }},app.kubernetes.io/instance={{ .Release.Name }}" -o jsonpath="{.items[0].metadata.name}")
   - kubectl --namespace {{ .Release.Namespace }} port-forward $LINHAVERDE_POD 8000:8000
   - Visit http://0.0.0.0:8080 to use your application