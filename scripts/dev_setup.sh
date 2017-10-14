set -e
echo "Creating development environment..."
mysql --login-path=local -e "create database if not exists pledge_dev;"
mysql --login-path=local -e "create user if not exists 'dev_user'@'localhost' identified by 'dev_user_password';"
echo "Success"
