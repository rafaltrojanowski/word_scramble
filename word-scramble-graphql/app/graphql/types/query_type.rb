module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :word, WordType, null: false do
      description "Returns random word"
    end

    def word
      Word.all.sample
    end

  end
end
