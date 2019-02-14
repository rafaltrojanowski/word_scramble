class Word < ApplicationRecord
  validates :content_en,
    presence: true, uniqueness: true
end
