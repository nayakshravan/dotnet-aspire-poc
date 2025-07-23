namespace drugs.api.Models;

public class Drug
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int MinimumStock { get; set; }
    public int MaximumStock { get; set; }
    public bool IsRecalled { get; set; }
    public bool IsExpired { get; set; }
    public DateTime ManufactureDate { get; set; }
    public DateTime ExpiryDate { get; set; }
}
