<script setup lang="ts">
interface PriceTableObj {
  fee_notes: string
  amount: number
  price: number
  subtotal: number
}

const content: Array<PriceTableObj> = [
  { fee_notes: 'testing', amount: 2, price: 20000, subtotal: 40000 },
  { fee_notes: 'testing', amount: 2, price: 20000, subtotal: 40000 },
]

const totalPrice = content.reduce((sum, currentItem) => {
  return sum + currentItem.subtotal
}, 0)

const expanded = ref(0)
</script>

<template>
  <VExpansionPanels v-model="expanded">
    <VExpansionPanel>
      <VExpansionPanelTitle>
        <h3>Biaya Pemeriksaan</h3>
      </VExpansionPanelTitle>
      <br>
      <VExpansionPanelText>
        <VTable
          density="comfortable"
          style="
            border: 1px solid #eae9eb;
            border-radius: 10px;
            border-collapse: collapse;
"
        >
          <thead style="background-color: #f6f6f6;">
            <th
              style="padding: 1.5svw;"
              class="text-left"
            >
              No
            </th>
            <th class="text-left">
              Keterangan Biaya
            </th>
            <th class="text-left">
              Jumlah
            </th>
            <th class="text-left">
              Harga
            </th>
            <th class="text-left">
              Sub Total
            </th>
          </thead>
          <tbody>
            <tr
              v-for="(item, idx) in content"
              :key="idx"
            >
              <td>{{ idx + 1 }}</td>
              <td>{{ item.fee_notes }}</td>
              <td>{{ item.amount }}</td>
              <td>Rp.{{ item.price.toLocaleString("id-ID") }}</td>
              <td>Rp.{{ item.subtotal.toLocaleString("id-ID") }}</td>
            </tr>
            <tr>
              <td />
              <td />
              <td />
              <td class="text-right">
                <b>Total</b>
              </td>
              <td>
                <b>Rp.{{ totalPrice.toLocaleString("id-ID") }}</b>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
