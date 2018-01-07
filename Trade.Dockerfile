FROM launchery/zen:arb-latest

COPY ./conf.js /app

ENTRYPOINT ["/usr/local/bin/node", "zenbot.js"]
CMD [ "trade", "--paper" ]
