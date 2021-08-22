# Must grant permission first to run:
# chmod +x ./pull-types.sh

pnpx openapi-typescript "https://drbasjzujulkfsqpbcuu.supabase.co/rest/v1/?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyOTMwOTQ0NywiZXhwIjoxOTQ0ODg1NDQ3fQ.MOd4PPf4NQeWY0c3-jn_ivqsjmm5x_5cR3QSXqmNmVQ" --output src/lib/types/supabase.ts
