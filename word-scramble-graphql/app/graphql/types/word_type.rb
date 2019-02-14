module Types
  class WordType < Types::BaseObject

    graphql_name 'WordType'

    field :id, ID, null: false
    field :content_en, String, null: false

  end
end
