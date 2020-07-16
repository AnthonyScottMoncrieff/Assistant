using FluentValidation;

namespace Assistant.Models.Entities.Validators
{
    public class TvShowValidation : AbstractValidator<TvShow>
    {

        public TvShowValidation()
        {
            RuleFor(x => x.ShowName).NotEmpty();
            RuleFor(x => x.ShowKey).NotEmpty();
            RuleFor(x => x.ThumbnailUrl).NotEmpty().Matches("^[^'\"]+$");
            RuleFor(x => x.Summary).NotEmpty().Matches("^(?!(?:.*<.{1,9}>.*)).*$");
        }
    }
}
