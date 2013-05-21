#!/bin/sh

i=0
while [ $i -lt 1000 ]
do
    i=$(( $i - 1 ))
    curl -X POST --data-binary @payload http://localhost:8000 --header "Content-Type:text/plain" > /dev/null
done


