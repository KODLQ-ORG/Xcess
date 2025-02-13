-- CreateTable
CREATE TABLE "access_reviews" (
    "review_id" SERIAL NOT NULL,
    "application_id" INTEGER,
    "user_id" VARCHAR(255),
    "access_level" TEXT,
    "access_justification" TEXT,
    "access_review_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "access_approver" VARCHAR(255),

    CONSTRAINT "access_reviews_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "application_reviewers" (
    "application_id" INTEGER NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "application_reviewers_pkey" PRIMARY KEY ("application_id","user_id")
);

-- CreateTable
CREATE TABLE "applications" (
    "application_name" VARCHAR(255) NOT NULL,
    "application_owner" VARCHAR(255),
    "auth_method" VARCHAR(255),
    "pii" BOOLEAN,
    "financial_data" BOOLEAN,
    "intellectual_property" BOOLEAN,
    "latest_access_review" TIMESTAMP(6),
    "application_id" SERIAL NOT NULL,
    "application_status" VARCHAR(255),
    "application_purpose" VARCHAR(255),

    CONSTRAINT "applications_pkey" PRIMARY KEY ("application_id")
);

-- CreateTable
CREATE TABLE "external_users" (
    "user_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "full_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "company" VARCHAR(255),

    CONSTRAINT "external_users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" VARCHAR(255) NOT NULL DEFAULT nextval('users_user_id_seq'::regclass),
    "display_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255),
    "last_name" VARCHAR(255),
    "job_title" VARCHAR(255),
    "department" VARCHAR(255),
    "is_active" BOOLEAN,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_application_user" ON "access_reviews"("application_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "applications_application_id_application_owner_key" ON "applications"("application_id", "application_owner");

-- CreateIndex
CREATE UNIQUE INDEX "external_users_email_key" ON "external_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "access_reviews" ADD CONSTRAINT "access_reviews_access_approver_fkey" FOREIGN KEY ("access_approver") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "access_reviews" ADD CONSTRAINT "access_reviews_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("application_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_reviews" ADD CONSTRAINT "access_reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "application_reviewers" ADD CONSTRAINT "application_reviewers_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("application_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "application_reviewers" ADD CONSTRAINT "application_reviewers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "fk_application_owner" FOREIGN KEY ("application_owner") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

