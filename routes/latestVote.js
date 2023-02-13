const db = require("../controllers/db");

module.exports = async function (fastify, opts) {
  fastify.get("/votes/:chamber", (request, reply) => {
    db.knex
      .select(
        "congress",
        "votenumber",
        "votedate",
        "question",
        "votesession",
        "result",
        "chamber",
        "votetype",
        "voteid",
        "yea",
        "nay",
        "present",
        "notvoting"
      )
      .from("votes")
      .whereRaw("votedate::date between current_date - 14 and current_date")
      .where({ chamber: `${request.params.chamber}` })
      .orderBy("votedate", "desc")
      .limit(60)
      .then((results) => {
        console.log(results);
        reply.send(results);
      });
  });
};
