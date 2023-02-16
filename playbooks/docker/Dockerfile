FROM nginx:stable-alpine

LABEL org.opencontainers.image.source https://github.com/ruchira088/job-market-analyzer-front-end

COPY ./playbooks/docker/default.conf /etc/nginx/conf.d/default.conf

COPY ./build /opt/job-market-analyzer-front-end

EXPOSE 80