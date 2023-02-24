const db = require("../controllers/db");

module.exports = async function (fastify, opts) {
  fastify.get("/latest/:billtype", (request, reply) => {
    db.knex
      .select(
        "billid",
        "shorttitle",
        "officialtitle",
        "introducedat",
        "summary",
        "actions",
        "billtype",
        "congress",
        "billnumber",
        "sponsors",
        "cosponsors",
        "statusat",
        "votes"
      )
      .from("public.bills")
      .whereRaw("statusat::date between current_date - 14 and current_date")
      .where({ billtype: `${request.params.billtype}` })
      .orderBy("statusat", "desc")
      .orderBy("billid", "desc")
      .limit(60)
      .then((results) => {
        console.log(results);
        reply.send(results);
      });
  });
};
