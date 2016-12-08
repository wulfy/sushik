NBINSCRITS=$(curl http://bo_v3_m6mobile:8e-B85uV@bo.v3.m6mobile.fr/crontab/test_inscriptions.php)
echo "test nb inscrits de la veille"
if [ $NBINSCRITS -gt $1 ]; then
  echo "SUCCESS"
else
  echo "FAILED"
  exit 1 #exit will be detected as a failed buil by Jenkins
fi