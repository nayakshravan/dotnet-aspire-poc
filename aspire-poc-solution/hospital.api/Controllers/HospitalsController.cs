using Microsoft.AspNetCore.Mvc;
using hospital.api.Models;
using hospital.api.Repositories;

namespace hospital.api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HospitalsController : ControllerBase
{
    private readonly HospitalRepository _repo;

    public HospitalsController(HospitalRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public IActionResult GetAll() => Ok(_repo.GetAll());

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var hospital = _repo.GetById(id);
        return hospital is not null ? Ok(hospital) : NotFound();
    }

    [HttpPost]
    public IActionResult Create(Hospital hospital)
    {
        _repo.Add(hospital);
        return CreatedAtAction(nameof(GetById), new { id = hospital.Id }, hospital);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, Hospital hospital)
    {
        if (id != hospital.Id) return BadRequest();
        return _repo.Update(hospital) ? NoContent() : NotFound();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        return _repo.Delete(id) ? NoContent() : NotFound();
    }
}
