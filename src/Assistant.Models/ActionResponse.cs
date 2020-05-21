namespace Assistant.Models
{
    public class ActionResponse<T>
    {
        public T Result { get; set; }
        public bool WasSuccessful { get; set; }
        public string Message { get; set; }
    }
}