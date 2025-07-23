using Microsoft.AspNetCore.Mvc;
using drugs.api.Models;
using drugs.api.Repositories;

namespace drugs.api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DrugsController : ControllerBase
{
    private readonly DrugRepository _repo;

    public DrugsController(DrugRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public IActionResult GetAll() => Ok(_repo.GetAll());

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var drug = _repo.GetById(id);
        return drug is not null ? Ok(drug) : NotFound();
    }

    [HttpPost]
    public IActionResult Create(Drug drug)
    {
        _repo.Add(drug);
        return CreatedAtAction(nameof(GetById), new { id = drug.Id }, drug);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, Drug drug)
    {
        if (id != drug.Id) return BadRequest();
        return _repo.Update(drug) ? NoContent() : NotFound();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        return _repo.Delete(id) ? NoContent() : NotFound();
    }
}
