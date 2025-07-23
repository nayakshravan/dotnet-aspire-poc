using drugs.api.Models;

namespace drugs.api.Repositories;

public class DrugRepository
{
    private readonly List<Drug> _drugs = new()
    {
        new Drug { Id = 1, Name = "Paracetamol", MinimumStock = 100, MaximumStock = 500, IsRecalled = false, IsExpired = false, ManufactureDate = DateTime.Now.AddMonths(-6), ExpiryDate = DateTime.Now.AddMonths(6) },
        new Drug { Id = 2, Name = "Amoxicillin", MinimumStock = 50, MaximumStock = 300, IsRecalled = false, IsExpired = false, ManufactureDate = DateTime.Now.AddMonths(-12), ExpiryDate = DateTime.Now.AddMonths(3) }
    };

    public IEnumerable<Drug> GetAll() => _drugs;

    public Drug? GetById(int id) => _drugs.FirstOrDefault(d => d.Id == id);

    public void Add(Drug drug) => _drugs.Add(drug);

    public bool Update(Drug updated)
    {
        var drug = GetById(updated.Id);
        if (drug == null) return false;

        drug.Name = updated.Name;
        drug.MinimumStock = updated.MinimumStock;
        drug.MaximumStock = updated.MaximumStock;
        drug.IsRecalled = updated.IsRecalled;
        drug.IsExpired = updated.IsExpired;
        drug.ManufactureDate = updated.ManufactureDate;
        drug.ExpiryDate = updated.ExpiryDate;
        return true;
    }

    public bool Delete(int id)
    {
        var drug = GetById(id);
        return drug != null && _drugs.Remove(drug);
    }
}
