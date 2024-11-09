#!/bin/bash
#
#

set -ex

# to retain all backups, set this value to a non-positive integer
bucket=mybus-angular-builds
projectName=myBusJwt-Angular
deployLocation=myBus-angular-build


#get the last uploaded zip filename
build_name=`aws s3 ls s3://$bucket | tail -1 | awk '{print $4}'`

#get the file name from .zip file
filename="${build_name%%.*}"

#copy the file from s3 bucket to local
aws s3 cp s3://$bucket/$build_name .

#unzip the file
unzip $build_name -d ~/temp

#copy to the build location
rm -fR ~/$deployLocation/
mv ~/temp/$filename/$projectName/   ~/$deployLocation/

rm -fR ~/temp

rm -fR $build_name

sudo service nginx reload

exit 0
