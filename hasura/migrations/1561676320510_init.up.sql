SET xmloption = content;
CREATE TABLE public.recipes (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    is_public boolean DEFAULT true NOT NULL,
    user_id text NOT NULL,
    ingredients jsonb NOT NULL,
    url text NOT NULL,
    tags jsonb NOT NULL,
    title text NOT NULL
);
CREATE TABLE public.todos (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    is_completed boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    is_public boolean DEFAULT false NOT NULL,
    user_id text NOT NULL,
    text text NOT NULL
);
CREATE TABLE public.users (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    auth0_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    last_seen timestamp with time zone DEFAULT now() NOT NULL
);
CREATE VIEW public.online_users AS
 SELECT users.name,
    users.last_seen
   FROM public.users
  WHERE (users.last_seen >= (now() - '00:00:30'::interval));
ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.todos
    ADD CONSTRAINT todos_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_id_key UNIQUE (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (auth0_id);
ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(auth0_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.todos
    ADD CONSTRAINT todos_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(auth0_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
