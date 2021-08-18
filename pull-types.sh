# Must grant permission first to run:
# chmod +x ./pull-types.sh

pnpx openapi-typescript "https://yvowukaetkyrsjetcnei.supabase.co/rest/v1/?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODE0NDk0NywiZXhwIjoxOTQzNzIwOTQ3fQ.-nhfA31ozehQsmOX1AIjcVf5Ez5F2T9IKLNkfZyXebg" --output src/lib/types/supabase.ts
