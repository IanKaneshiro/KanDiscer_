"""changing start and end time to DATETIME type

Revision ID: 6bc18ac1c0b9
Revises: e11339d3607b
Create Date: 2023-10-04 20:41:31.180672

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '6bc18ac1c0b9'
down_revision = 'e11339d3607b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('rounds', schema=None) as batch_op:
        batch_op.alter_column('start_time',
                              existing_type=sa.TIME(),
                              type_=sa.DateTime(),
                              existing_nullable=True)
        batch_op.alter_column('end_time',
                              existing_type=sa.TIME(),
                              type_=sa.DateTime(),
                              existing_nullable=True)
    if environment == "production":
        op.execute(f"ALTER TABLE rounds SET SCHEMA {SCHEMA};")

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('rounds', schema=None) as batch_op:
        batch_op.alter_column('end_time',
                              existing_type=sa.DateTime(),
                              type_=sa.TIME(),
                              existing_nullable=True)
        batch_op.alter_column('start_time',
                              existing_type=sa.DateTime(),
                              type_=sa.TIME(),
                              existing_nullable=True)

    # ### end Alembic commands ###