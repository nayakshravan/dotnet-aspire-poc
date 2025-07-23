using hospital.api.Models;

namespace hospital.api.Repositories;

public class HospitalRepository
{
    private readonly List<Hospital> _hospitals = new()
    {
        new Hospital { Id = 1, Name = "Apollo Hospitals", Location = "Bangalore" },
        new Hospital { Id = 2, Name = "AIIMS", Location = "Delhi" },
    };

    public IEnumerable<Hospital> GetAll() => _hospitals;

    public Hospital? GetById(int id) => _hospitals.FirstOrDefault(h => h.Id == id);

    public void Add(Hospital hospital) => _hospitals.Add(hospital);

    public bool Update(Hospital updated)
    {
        var hospital = GetById(updated.Id);
        if (hospital is null) return false;
        hospital.Name = updated.Name;
        hospital.Location = updated.Location;
        return true;
    }

    public bool Delete(int id)
    {
        var hospital = GetById(id);
        if (hospital is null) return false;
        return _hospitals.Remove(hospital);
    }
}
