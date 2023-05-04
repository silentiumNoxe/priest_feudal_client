command=$1

if [ "$command" = "package" ]; then
  docker build -t snoxe/priest_feudal_client:latest .
fi

if [ "$command" = "run" ]; then
  ./cli.sh package
  docker run -p 8080:8080 snoxe/priest_feudal_client
fi