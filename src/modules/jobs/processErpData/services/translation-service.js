function getTranslatePayload (payloads) {
  return payloads.map((payload) => {
    const skuId = Math.floor(100000 + Math.random() * 900000)
    const categoryId = Math.floor(100000 + Math.random() * 900000)
    const subCategoryId = Math.floor(100000 + Math.random() * 900000)
    const sku = `${payload.nm_produto}-${skuId}`

    const {
      parsedCreatedAt,
      parsedUpdatedAt,
      parsedPublishedAt
    } = formatPaylaodDates({
      createdAt: payload.dt_criado,
      updatedAt: payload.dt_atualizado,
      publishedAt: payload.dt_publicacao
    })

    return {
      productId: payload.id_produto,
      title: payload.nm_produto,
      description: payload.nm_descricao,
      createdAt: parsedCreatedAt,
      updatedAt: parsedUpdatedAt,
      publishedAt: parsedPublishedAt,
      publishedScope: payload.nm_publicacao_canal.toLowerCase(),
      brand: {
        name: payload.nm_marca
      },
      category: {
        id: String(categoryId),
        name: payload.nm_categoria_departamento,
        child: {
          id: String(subCategoryId),
          name: payload.nm_categoria_setor
        }
      },
      skus: [
        {
          height: {
            unit: 'cm',
            value: Number(payload.vl_altura_cm)
          },
          length: {
            unit: 'cm',
            value: Number(payload.vl_comprimento_cm)
          },
          weight: {
            unit: 'kg',
            value: Number(payload.vl_peso_kg)
          },
          width: {
            unit: 'cm',
            value: Number(payload.vl_largura_cm)
          },
          requiresShipping: Boolean(payload.st_entrega_obrigatoria),
          sku,
          skuId: String(skuId),
          title: sku,
          updatedAt: parsedUpdatedAt
        }
      ]
    }
  })
}

function formatPaylaodDates ({ createdAt, updatedAt, publishedAt }) {
  const [createdAtDay, createdAtMonth, createdAtYear] = createdAt.split('/')

  const [updatedAtDay, updatedAtMonth, updatedAtYear] = updatedAt.split('/')

  const [publishedAtDay, publishedAtMonth, publishedAtYear] = publishedAt.split(
    '/'
  )

  return {
    parsedCreatedAt: new Date(
      createdAtYear,
      Number(createdAtMonth) - 1,
      createdAtDay
    ),
    parsedUpdatedAt: new Date(
      updatedAtYear,
      Number(updatedAtMonth) - 1,
      updatedAtDay
    ),
    parsedPublishedAt: new Date(
      publishedAtYear,
      Number(publishedAtMonth) - 1,
      publishedAtDay
    )
  }
}

module.exports = { getTranslatePayload }
