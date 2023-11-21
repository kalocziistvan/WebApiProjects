using Microsoft.AspNetCore.Mvc;
using WebAPIBase.JokeModels;

namespace JokesApplication.Controllers
{
    [Route("api/jokes")]
    [ApiController]
    public class JokesController : Controller
    {
        // GET: api/jokes
        [HttpGet]
        public IActionResult Get()
        {
            FunnyDatabaseContext context = new FunnyDatabaseContext();
            return Ok(context.Jokes.ToList());
        }

        // GET api/jokes/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            FunnyDatabaseContext context = new FunnyDatabaseContext();
            var keresettVicc = (from x in context.Jokes
                                where x.JokeSk == id
                                select x).FirstOrDefault();
            if (keresettVicc == null)
            {
                return NotFound($"Nincs #{id} azonosítóval vicc");
            }
            else
            {
                return Ok(keresettVicc);
            }
        }

        // POST api/jokes
        [HttpPost]
        public void Post([FromBody] Joke újVicc)
        {
            FunnyDatabaseContext context = new FunnyDatabaseContext();
            context.Jokes.Add(újVicc);
            context.SaveChanges();
        }

        // PUT api/<JokeController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Joke joke)
        {
            FunnyDatabaseContext context = new FunnyDatabaseContext();
            var meglevoVicc = (from x in context.Jokes where x.JokeSk == id select x).FirstOrDefault();
            if (meglevoVicc == null)
            {
                return NotFound($"Nincs #{id} azonosítóval vicc");
            }
            else
            {
                // frissítés
                meglevoVicc.JokeText = joke.JokeText;
                meglevoVicc.UpVotes = joke.UpVotes;
                meglevoVicc.DownVotes = joke.DownVotes;

                context.Jokes.Update(meglevoVicc);
                context.SaveChanges();

                return Ok(meglevoVicc);
            }
        }

        // DELETE api/jokes/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            FunnyDatabaseContext context = new FunnyDatabaseContext();
            var törlendőVicc = (from x in context.Jokes
                                where x.JokeSk == id
                                select x).FirstOrDefault();
            context.Remove(törlendőVicc);
            context.SaveChanges();
        }
    }
}
