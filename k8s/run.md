# START #
-- Postgres
kubectl apply -f pv-local.yml 
kubectl apply -f mypostgres-pvc.yml
kubectl apply -f mypostgres-clusterip.yml
kubectl apply -f mypostgres-secret.yml
kubectl apply -f mypostgres-configMap.yml
kubectl apply -f mypostgres-deployment.yml
-- Redis
kubectl apply -f myredis-clusterip.yml 
kubectl apply -f myredis-deployment.yml
-- Backend
kubectl apply -f mybackend-clusterip.yml 
kubectl apply -f mybackend-deployment.yml
kubectl apply -f mybackend-node-port.yml #
-- Frontend (Nginx)
kubectl apply -f mynginx-clusterip.yml 
kubectl apply -f mynginx-deployment.yml
kubectl apply -f mynginx-node-port.yml #
-- for Ingress
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.47.0/deploy/static/provider/cloud/deploy.yaml #
-- Ingress
kubectl apply -f myingress.yml 

# CLOSE / DELETE #
kubectl delete services --all
kubectl delete configMaps --all
kubectl delete deployments --all
kubectl delete pods --all
kubectl delete pvc --all
kubectl delete pv --all
kubectl delete secret --all